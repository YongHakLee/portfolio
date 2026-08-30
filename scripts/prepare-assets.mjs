// 원본 images/ 를 웹용으로 가공해 public/images/ 에 넣고,
// 강의 유튜브 썸네일을 내려받는다. (반복 실행해도 안전)
import sharp from "sharp";
import { copyFile, mkdir, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const SRC = "images";
const DEST = "public/images";
const LECTURE_DEST = "public/images/lectures";

const PROJECT_IMAGES = [
  "project01_01.png", "project01_02.png",
  "project02_01.png", "project02_02.png",
  "project03_01.png", "project03_02.png",
  "project04_01.png", "project04_02.png",
];

// [저장 파일명, 유튜브 video ID]
const THUMBS = [
  ["python-01", "F3VAh_BqVzE"], ["python-02", "slKrDhcAwZo"],
  ["python-03", "HWvqV_pGNuY"], ["python-04", "TEetHwPZ2tA"],
  ["docker-01", "vWvbGnc_d4U"], ["docker-02", "tnk0lmEI1dE"],
  ["docker-03", "B0GzSC_P6bg"], ["docker-04", "N_zhBD2eyXI"],
  ["docker-05", "ZZ-9wMJ4pbQ"], ["docker-06", "m-HhPykBUH4"],
  ["docker-07", "-N6xAo-GuVg"], ["docker-08", "LelDbRgyc_E"],
];

await mkdir(LECTURE_DEST, { recursive: true });

for (const name of PROJECT_IMAGES) {
  const src = path.join(SRC, name);
  const out = path.join(DEST, name);
  await sharp(src)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);
  // 재압축 결과가 원본보다 크면(이미 최적화된 PNG) 원본을 그대로 쓴다
  const [{ size: outSize }, { size: srcSize }] = [await stat(out), await stat(src)];
  if (outSize > srcSize) {
    await copyFile(src, out);
    console.log(`${name}: ${(srcSize / 1024).toFixed(0)}KB (원본 유지)`);
  } else {
    console.log(`${name}: ${(outSize / 1024).toFixed(0)}KB`);
  }
}

await sharp(path.join(SRC, "yonghaklee.jpg"))
  .resize({ width: 480, height: 480, fit: "inside" })
  .jpeg({ quality: 85 })
  .toFile(path.join(DEST, "yonghaklee.jpg"));
console.log("yonghaklee.jpg 완료");

for (const [name, id] of THUMBS) {
  const res = await fetch(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
  if (!res.ok) throw new Error(`썸네일 실패 ${id}: HTTP ${res.status}`);
  await pipeline(
    Readable.fromWeb(res.body),
    createWriteStream(path.join(LECTURE_DEST, `${name}.jpg`)),
  );
  console.log(`lectures/${name}.jpg 완료`);
}

// ── 프로젝트 증빙 이미지: projects/ 원본 → public/images/projects/ 웹용 가공 ──
// [원본 파일명, 저장할 이름]
const PROJECT_SETS = [
  {
    src: "projects/datavoucher",
    files: [
      ["result1.png", "datavoucher-paprika.png"],
      ["result2.png", "datavoucher-strawberry.png"],
      ["result3.png", "datavoucher-clothing.png"],
    ],
  },
  {
    src: "projects/3D_reverse_engineering",
    files: [["eval.png", "3d-eval.png"]],
  },
];

// 참고: public/images/projects/3d-demo.png 는 시연 영상에서 뽑은 포스터 컷이다.
// 영상과 추출 스크립트를 함께 지웠으므로 이 파일은 재생성되지 않고 저장소에 그대로 커밋되어 있다.
const PROJECT_DEST = "public/images/projects";

// 공개 전 가려야 하는 영역. 시험성적서에는 G4B 진위확인코드와 QR이 찍혀 있는데,
// 이 둘이면 누구나 정부 포털에서 원본 전문을 조회할 수 있다. 포트폴리오가 근거로 쓰는 것은
// 시험결과 항목이지 조회 경로가 아니므로 덮는다.
// 좌표는 이미지 크기 대비 비율이라 원본 해상도가 바뀌어도 따라간다.
const MASKS = {
  "3d-eval.png": [
    { left: 0.4824, top: 0.0146, width: 0.5176, height: 0.0333 }, // 우측 상단 진위확인코드
    { left: 0, top: 0.8902, width: 0.133, height: 0.0998 }, // 좌측 하단 QR
  ],
};

const whiteRect = (w, h) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#ffffff"/></svg>`);

await mkdir(PROJECT_DEST, { recursive: true });

for (const set of PROJECT_SETS) {
  for (const [name, outName] of set.files) {
    const src = path.join(set.src, name);
    const out = path.join(PROJECT_DEST, outName);
    const masks = MASKS[outName];

    const resized = sharp(src).resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    });

    if (masks) {
      // 리사이즈 후 크기를 알아야 비율 좌표를 픽셀로 바꿀 수 있다
      const buf = await resized.png().toBuffer();
      const { width, height } = await sharp(buf).metadata();
      await sharp(buf)
        .composite(
          masks.map((m) => ({
            input: whiteRect(Math.round(m.width * width), Math.round(m.height * height)),
            left: Math.round(m.left * width),
            top: Math.round(m.top * height),
          })),
        )
        .png({ compressionLevel: 9 })
        .toFile(out);
      // 마스킹한 이미지는 원본으로 되돌리면 안 되므로 크기 비교 폴백을 건너뛴다
      const { size } = await stat(out);
      console.log(`projects/${outName}: ${(size / 1024).toFixed(0)}KB (마스킹 적용)`);
      continue;
    }

    await resized.png({ compressionLevel: 9 }).toFile(out);
    // 재압축 결과가 원본보다 크면(이미 최적화된 PNG) 원본을 그대로 쓴다
    const [{ size: outSize }, { size: srcSize }] = [await stat(out), await stat(src)];
    if (outSize > srcSize) {
      await copyFile(src, out);
      console.log(`projects/${outName}: ${(srcSize / 1024).toFixed(0)}KB (원본 유지)`);
    } else {
      console.log(`projects/${outName}: ${(outSize / 1024).toFixed(0)}KB`);
    }
  }
}

console.log("DONE");

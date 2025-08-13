[Traktir Kopi Gan !!](https://sociabuzz.com/arrayazman/tribe)

# Antrian-Poli
Antrian Poli Klinik
Sudah menggunakan text to speech menggunakan librari dari responsivevoice.js
data yang ditampilkan sudah sesuai jam praktek dokter
jalankan Query SQL berikut untuk update enum agar suara tidak looping

ALTER TABLE `antripoli` CHANGE `status` `status` ENUM('0','1','2','3') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;

CREATE TABLE `antriadmisi`  (
  `kd_loket` char(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `jenis` enum('kasir','loket') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `status` enum('0','1','2','3') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `norm` varchar(17) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `waktu` datetime NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;


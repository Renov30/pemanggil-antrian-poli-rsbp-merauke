function pengaturan() {
  //=========================================================================
  // Menampilkan data rumah sakit
  $(document).ready(function () {
    $.ajax({
      url: "app/antrian.php?p=pengaturan",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var email = $("#email");
        email.html(data.email);

        var namars = $("#namars");
        namars.html(data.nama_instansi);

        var text = $("#text");
        text.html(data.text);
      },
    });
  });

  // //==================pengaturan video ===============
  const videoPlayer = document.getElementById("myVideo");
  // ganti path video , bisa juga menggunakan url video
  const videos = [
    "video/video-profil1.mp4",
    "video/video-profil2.mp4",
    "video/video-profil3.mp4",
  ];
  // Ganti dengan daftar video yang Anda inginkan
  let currentVideoIndex = 0;
  // Fungsi untuk mengatur video pertama sebagai sumber awal
  function setInitialVideo() {
    videoPlayer.src = videos[currentVideoIndex];
  }

  // Event listener saat video selesai diputar
  videoPlayer.addEventListener("ended", () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.play();
  });
  // // Mengatur volume ke 20%
  videoPlayer.volume = 0.2;
  // // Mengatur Mute Video
  videoPlayer.muted = true;
  videoPlayer.poster = "video/poster.jpg";

  // Panggil fungsi untuk mengatur video pertama saat halaman dimuat
  setInitialVideo();
}
$(document).ready(function () {
  pengaturan();
});
//=========================================================================
// Fungsi ubah singkatan
function ubahSingkatan(teks) {
  const kamus = {
    sdr: "saudara",
    sdri: "saudari",
    tn: "tuan",
    ny: "nyonya",
    an: "anak",
    by: "bayi",
    dr: "dokter",
    pst: "pastor",
    sr: "suster",
  };

  let hasil = teks;

  for (let singkatan in kamus) {
    let regex = new RegExp("\\b" + singkatan + "\\.?\\b", "gi");
    hasil = hasil.replace(regex, kamus[singkatan]);
  }

  return hasil;
}

let antrianSuara = [];
let sedangMain = false;

function putarBerikutnya() {
  if (antrianSuara.length === 0) {
    sedangMain = false;
    return;
  }

  sedangMain = true;
  let item = antrianSuara.shift(); // ambil data pertama dari queue

  var nomorAntrian = $("#nomor");
  nomorAntrian.empty();
  var antrian = $(
    "<h3>" +
      item.nm_pasien +
      "</h3><br>" +
      "<h2 class='display-3'>" +
      item.no_reg +
      "</h2><br>" +
      "<b class='h3'>" +
      item.nm_poli +
      "</b><br><b class='h4'>" +
      item.nm_dokter +
      "</b>"
  );
  nomorAntrian.append(antrian);

  // Pilih audio sesuai poli
  let audio;
  if (item.nm_poli === "kasir") {
    audio = document.getElementById("KasirAudio");
  } else if (item.nm_poli === "loket") {
    audio = document.getElementById("LoketAudio");
  } else {
    audio = document.getElementById("myAudio");
  }

  audio.onended = function () {
    responsiveVoice.speak(
      "Atas nama " +
        ubahSingkatan(item.nm_pasien.toLowerCase()) +
        ", Silahkan menuju " +
        item.nm_poli.toLowerCase() +
        (item.nm_poli === "loket" && item.kd_loket
          ? " " + item.kd_loket.toLowerCase()
          : ""),
      "Indonesian Female",
      {
        pitch: 1,
        rate: 0.9,
        volume: 1,
        onend: function () {
          putarBerikutnya();
        },
      }
    );
  };

  audio.play();
}

//=========================================================================
// Fungsi pemanggil
function Suara() {
  $.ajax({
    url: "app/antrian.php?p=panggil",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // var nomorAntrian = $("#suara");
      // nomorAntrian.empty();

      $.each(data, function (index, item) {
        // Masukkan data ke queue
        antrianSuara.push(item);
      });

      // Kalau tidak ada audio yang sedang main, mulai putar
      if (!sedangMain) {
        putarBerikutnya();
      }
    },
  });

  //========================================================================
  //==display poli==

  $.ajax({
    url: "app/antrian.php?p=poli",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var swiperWrapper = $("#datapoli");
      swiperWrapper.empty();

      // Loop melalui data dan tambahkan slide
      $.each(data, function (index, item) {
        var varpoli = $(
          "<div class='col-lg-3 text-center '>" +
            "<div class='card pt-2 border border-success'>" +
            "<h5>" +
            item.nm_poli +
            "</h5><b>" +
            item.nm_dokter +
            "</b><br><p class='pasien'>"
        );

        $.each(item.data_pasien, function (index, pasien) {
          var antrian_pasien = $(
            "<h2>" +
              // pasien.kd_poli +
              // "-" +
              pasien.no_reg +
              "</h2>" +
              "<h5>" +
              pasien.nm_pasien +
              "</h5>"
          );
          varpoli.find(".pasien").append(antrian_pasien);
        });
        varpoli.append("</p></div></div>");
        swiperWrapper.append(varpoli);
      });
    },
  });

  //=======================================================================
}
//refresh otomatis setiap detik
setInterval(Suara, 750);
$(document).ready(function () {
  Suara();
});

//=======================================================================

//==========membuat jam=============
function updateClock() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Format waktu dengan tambahkan "0" di depan angka jika kurang dari 10
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  var timeString = "" + hours + ":" + minutes + ":" + seconds;

  // Update elemen HTML dengan waktu yang telah diformat
  document.getElementById("clock").innerHTML = timeString;
}

// Panggil fungsi updateClock setiap detik
setInterval(updateClock, 1000);

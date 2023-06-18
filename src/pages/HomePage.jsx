import React from "react";
import Hero from "../components/Hero";
import AboutSehati from "../components/AboutSehati";
import Calculator from "../components/Calculator";
import Footer from "../components/Footer";
import OurTeam from "../components/OurTeam";

const HomePage = () => {
  return (
    <>
      <Hero />
      <main>
        <AboutSehati />
        <Calculator />
        <OurTeam />
      </main>
      <Footer />
      {/* <main>
        <section id="aboutus">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12 mb-3">
                <h2 class="mb-5">
                  About <strong>Sehati.id</strong>
                </h2>
                <p>
                  Kami hadir untuk memberikan solusi yang tepat bagi Anda dalam
                  mengelola status gizi dan mencapai gaya hidup sehat. Dengan
                  dukungan ahli gizi terbaik di Indonesia, kami menyediakan
                  layanan konsultasi online yang personal dan rekomendasi diet
                  yang sesuai dengan kebutuhan Anda.
                </p>
                <p>
                  {" "}
                  Temukan artikel-artikel informatif tentang gizi kesehatan,
                  nutrisi, dan tips hidup sehat di blog kami. Kami juga
                  menyediakan kuis interaktif yang akan menguji pengetahuan Anda
                  seputar gizi dan membantu Anda memahami pentingnya pola makan
                  yang seimbang.
                </p>
                <button type="button" class="btn btn-outline-primary">
                  Lorem ipsum dolor sit.
                </button>
              </div>
              <div class="col-lg-6 col-md-12 text-center">
                <img
                  src="./assets/logohijau.png"
                  alt="logo"
                  class="aboutuslogo"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="calculator">
          <div class="container-lg">
            <div class="judulcalculator text-center mb-3">
              <h2>KALKULATOR INDEKS MASSA TUBUH</h2>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-center">
                <form class="bg-white rounded-3 w-100">
                  <div class="jk d-flex align-items-center mb-4">
                    <label for="" class="form-label me-4 fw-bold">
                      JENIS KELAMIN
                    </label>
                    <select
                      class="form-select box-inputs"
                      aria-label="Default select example"
                    >
                      <option selected disabled>
                        Jenis Kelamin
                      </option>
                      <option value="1">Laki-Laki</option>
                      <option value="2">Perempuan</option>
                    </select>
                  </div>
                  <div class="tanggal-lahir d-flex align-items-center mb-4">
                    <label for="" class="form-label me-4 fw-bold">
                      TANGGAL LAHIR
                    </label>
                    <select
                      id="tanggalDropdown"
                      class="form-select me-3 box-inputs"
                      aria-label="Default select example"
                    >
                      <option selected disabled>
                        Tanggal
                      </option>
                    </select>
                    <select
                      id="bulanDropdown"
                      class="form-select me-3 box-inputs"
                      aria-label="Default select example"
                    >
                      <option selected disabled>
                        Bulan
                      </option>
                    </select>
                    <select
                      id="tahunDropdown"
                      class="form-select me-3 box-inputs"
                      aria-label="Default select example"
                    >
                      <option selected disabled>
                        Tahun
                      </option>
                    </select>
                  </div>
                  <div class="tinggi-badan d-flex align-items-center mb-4">
                    <label for="" class="form-label me-4 fw-bold">
                      TINGGI BADAN
                    </label>
                    <input type="number" class="form-control box-input" id="" />
                    <label class="form-label me-3">CM</label>
                    <input type="range" class="form-range" id="customRange1" />
                  </div>
                  <div class="berat-badan d-flex align-items-center mb-4">
                    <label for="" class="form-label me-4 fw-bold">
                      BERAT BADAN
                    </label>
                    <input type="number" class="form-control box-input" id="" />
                    <label class="form-label me-3">KG</label>
                    <input type="range" class="form-range" id="customRange1" />
                  </div>
                  <div class="aktivitas d-flex align-items-center mb-4 flex-wrap">
                    <label for="" class="form-label me-4 fw-bold mb-3">
                      AKTIVITAS
                    </label>
                    <button
                      type="button"
                      class="btn btn-calculator me-3 mb-3 box-input"
                    >
                      Ringan
                    </button>
                    <button
                      type="button"
                      class="btn btn-calculator me-3 mb-3 box-input"
                    >
                      Sedang
                    </button>
                    <button
                      type="button"
                      class="btn btn-calculator me-3 mb-3 box-input"
                    >
                      Berat
                    </button>
                    <button
                      type="button"
                      class="btn btn-calculator me-3 mb-3 box-input"
                    >
                      Sangat Berat
                    </button>
                  </div>
                  <div class="text-center my-5">
                    <button type="submit" class="btn-calculator text-white">
                      HITUNG
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="teams">
          <div class="container">
            <div class="row text-center mb-3">
              <div class="col-12">
                <h3>Meet Our</h3>
                <h2>
                  <strong>Sehati.id Team</strong>
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card">
                  <img
                    src="./assets/profile.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body text-center">
                    <p class="card-text fw-bold">Deni</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card">
                  <img
                    src="./assets/profile.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body text-center">
                    <p class="card-text fw-bold">Aini</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card">
                  <img
                    src="./assets/profile.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body text-center">
                    <p class="card-text fw-bold">Hafizh</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card">
                  <img
                    src="./assets/profile.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body text-center">
                    <p class="card-text fw-bold">Alan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="bg-light text-center text-lg-start">
        <div class="container">
          <div class="row">
            <div class="col footerlist mt-3">
              <div class="imagelogofooter me-5">
                <img src="./assets/logo.png" alt="" width="100px" />
              </div>
              <div class="sehatilistnav">
                <ul class="navbar-nav">
                  <li class="nav-item me-3">
                    <a class="nav-link fw-bold" aria-current="page" href="#">
                      Sehati.id
                    </a>
                  </li>
                  <li class="nav-item me-3">
                    <a class="nav-link" href="#aboutus">
                      About Us
                    </a>
                  </li>
                  <li class="nav-item me-3">
                    <a class="nav-link" href="#teams">
                      Team
                    </a>
                  </li>
                  <li class="nav-item me-3">
                    <a class="nav-link" href="#article">
                      Article
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col text-center mt-3">
              <p>Social Media</p>
              <div class="iconfooter">
                <img class="me-3" src="./assets/ig.png" alt="" width="40px" />
                <img
                  class="me-3"
                  src="./assets/linkedin.png"
                  alt=""
                  width="40px"
                />
                <img class="me-3" src="./assets/wa.png" alt="" width="40px" />
                <img
                  class="me-3"
                  src="./assets/twitter.png"
                  alt=""
                  width="40px"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="text-center p-3 mt-5">
          © 2020 Copyright:
          <a class="text-white text-decoration-none" href="#">
            <strong>Sehati.id</strong>
          </a>
        </div>
      </footer> */}
    </>
  );
};

export default HomePage;

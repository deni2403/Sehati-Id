import React, { useState } from "react";

const Calculator = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("Laki-laki");
  const [gender, setGender] = useState("");

  const handleHeightChange = (event) => {
    const newHeight = parseInt(event.target.value, 10);
    setHeight(newHeight);
  };

  const handleWeightChange = (event) => {
    const newWeight = parseInt(event.target.value, 10);
    setWeight(newWeight);
  };

  const calculateBMI = () => {
    let value = 0;
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      value = bmiValue.toFixed(2);
      setBMI(bmiValue.toFixed(2));
    }
    if (value < 18.5) {
      setCategory("Berat badan kurang atau kekurangan berat badan.");
    } else if (value < 25) {
      setCategory("Berat badan normal atau sehat.");
    } else if (value < 30) {
      setCategory("Kelebihan berat badan.");
    } else if (value < 35) {
      setCategory("Obesitas Kelas I.");
    } else if (value < 40) {
      setCategory("Obesitas Kelas II.");
    } else {
      setCategory("Obesitas Kelas III atau obesitas yang parah.");
    }
  };

  //   Berikut adalah kategori BMI menurut WHO:

  // Kurus: BMI di bawah 18,5
  // Normal: BMI antara 18,5 dan 24,9
  // Kelebihan berat badan: BMI antara 25 dan 29,9
  // Obesitas: BMI antara 30 dan 34,9 (obesitas tingkat I), BMI antara 35 dan 39,9 (obesitas tingkat II), BMI 40 atau lebih (obesitas tingkat III atau obesitas ekstrem)
  return (
    <>
      <section className="bg-[#F3FFF4] p-4">
        <h2 className="text-[#1C9509] font-bold text-center text-2xl">
          KALKULATOR INDEKS MASSA TUBUH
        </h2>
        <form className="flex flex-col p-4 space-y-4 bg-white">
          <div>
            <label
              htmlFor=""
              className="font-semibold"
              onChange={(e) => setGender(e.target.value)}
            >
              Jenis Kelamin
            </label>
            <select name="" id="" className="w-full p-2 mt-2 shadow">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              Tinggi Badan (cm)
            </label>
            <div>
              <input
                type="number"
                value={height}
                onChange={handleHeightChange}
                className="w-full p-2 mt-2 shadow"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              Berat Badan (kg)
            </label>
            <div>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                className="w-full p-2 mt-2 shadow"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={calculateBMI}
              className="mt-4 bg-[#1C9509] text-white p-2 w-full"
            >
              Hitung
            </button>
          </div>
          {bmi && <p>BMI: {bmi}</p>}
          {bmi && <p>Kategori: {category}</p>}
        </form>
      </section>
    </>
  );
};

export default Calculator;

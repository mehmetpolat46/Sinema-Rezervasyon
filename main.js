//Bağlantı Kontrolu
//console.log('Bağlandı')

/*
1-Aşama Tıklanılan Koltuğun rengini değiştir ve tekrar tıklanınca tersine çevir
 --Önce container divine eriş
 --Bu dive olay dinleyicisi ekle
 --tıklanılan elemeanı tespit et
 --tespit ettiğin elemanın classında seat varsa onun class listine selected ekle
 --eğer selected classı varsa çıkar (Yani toggle yap)

2-Eğer Seçili Koltuk Yoksa info yazısı kalkacak varsa gelecek
  --info yazısına eriş
  --sonra seçili koltuk olup olmadığını kontrol et
  --varsa varsa textin displayini değiştir

3-Seçili Koltuk sayısnı ve Toplam Tutarı bilgi yazsında gösterme
 --seçili koltuk sayısını aktarmakı için count classlı divi çek
 --bu divin innerText ine selectedSeatsCount ver
 --film seçme kısmını filmlerin fiyat bilgisi için çek
 --ve toplam sayı ile bu değeri çarp
 --amount classlı spana ekle




*/

//Tıklanılan koltuk tespiti için container divi çağırma
const container = document.querySelector(".container");
//console.log(container)
const infoText = document.querySelector(".infoText");
//console.log(infoText)
const select = document.getElementById("movie");
//console.log(select)
//Selectin içindeki value değeri filmin fiyatına eşit
//console.log(select.value)
const count = document.querySelector("#count");
//console.log(count)
const amount = document.querySelector("#amount");
//console.log(amount)
const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

//Veri Tabanında veri okuma

const getSeatsFromDatabase = () => {
  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  select.selectedIndex = dbSelectedMovie;
  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

//Veri Tabanına Kayıt Etme

const saveSeatsToDatabase = (index) => {
  // console.log(index)
  localStorage.setItem("selectedSeatIndex", JSON.stringify(index));
  localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex));
};

getSeatsFromDatabase();
//Tutar Hesaplama Fonksiyonu
const priceCalculator = () => {
  //====Koltukların  Sıra Numarası Tespit İşlemleri====//

  //Tüm Koltukları dizi haline getirme
  const seatsArray = [];
  seats.forEach((seat) => {
    seatsArray.push(seat);
  });

  //console.log(seatsArray)

  const selectedSeats = container.querySelectorAll(".seat.selected");
  //console.log(selectedSeats)
  const selectedSeatsArray = [];

  selectedSeats.forEach((selectedSeat) => {
    selectedSeatsArray.push(selectedSeat);
  });
  //console.log(selectedSeatsArray)

  let selectedSeatIndex = selectedSeatsArray.map((selectedSeat) => {
    return seatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatIndex)

  //====Hesaplama İşlemleri====//

  //Toplam seçili koltuk sayısını bulma
  const selectedSeatsCount =
    container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)
  const moviePrice = select.value;
  //console.log(moviePrice)

  //Seçili koltuk varsa sorgusu
  if (selectedSeatsCount > 0) {
    //Eğer varsa textin still özellğini değiştrime
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }
  //Toplam seçili koltuk sayısını html gönderme
  count.innerText = selectedSeatsCount;
  //Toplam Tutarı Html gönderme
  amount.innerText = moviePrice * selectedSeatsCount;

  saveSeatsToDatabase(selectedSeatIndex);
};
priceCalculator();

container.addEventListener("click", (pointerEvent) => {
  //tıklanılan elementlerden koltuğu tespit etme
  //console.log(pointerEvent.target.offsetParent)

  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }

  priceCalculator();
});

select.addEventListener("change", () => {
  priceCalculator();
});


function changeMovie() {
  var movieSelect = document.getElementById("movie");
  var screenImage = document.querySelector(".screen img");

  if (movieSelect.value === "100") {
    screenImage.src =
      "https://upload.wikimedia.org/wikipedia/tr/thumb/b/b3/Harry_Potter_and_the_Deathly_Hallows_-_Part_1_%28film_m%C3%BCzi%C4%9Fi_alb%C3%BCm%C3%BC%29.jpg/600px-Harry_Potter_and_the_Deathly_Hallows_-_Part_1_%28film_m%C3%BCzi%C4%9Fi_alb%C3%BCm%C3%BC%29.jpg";
  } else if (movieSelect.value === "200") {
    screenImage.src =
      "https://cdn1.ntv.com.tr/gorsel/50XIH8C6CkS9npleDe_4lQ.jpg?width=1000&mode=crop&scale=both";
  } else if (movieSelect.value === "300") {
    screenImage.src =
      "https://cdn1.ntv.com.tr/gorsel/FToO9aLFDU2sU4G0DgEZOg.jpg?width=1000&mode=crop&scale=both";
  }
  
}
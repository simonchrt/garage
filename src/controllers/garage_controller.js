import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList", "brand", "model", "owner", "plate"]

  connect() {
    this.url = "https://wagon-garage-api.herokuapp.com/Paul Walker/cars"
    fetch(this.url)
      .then(response => response.json())
      .then((data) =>  {
        data.forEach((car) => {
          this.insertCarCard(car);
        })
      });
  }


  createCar() {
    event.preventDefault();
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "brand": this.brandTarget.value,
        "model": this.modelTarget.value,
        "owner": this.ownerTarget.value,
        "plate": this.plateTarget.value
      })
    })
    .then(response => response.json())
    .then((data) => {
      this.insertCarCard(data);
    })
  }

  insertCarCard = (car)  => {
          const carCard = `
          <div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
            </div>
            <div class="car-info">
              <h4>${car.brand} ${car.model}</h4>
              <p><strong>Owner:</strong> ${car.owner}</p>
              <p><strong>Plate:</strong> ${car.plate}</p>
            </div>
            <button class="btn btn-danger" data-action="click->garage#destroyCar" data-id="${car.id}">DESTROY</button>
          </div>`
          this.carsListTarget.insertAdjacentHTML("afterbegin",carCard);
      }

    destroyCar(){
      const element = event.currentTarget
      const id = event.currentTarget.dataset.id
      fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`,{
        method: "DELETE"})
        .then(response => response.json())
        .then((data) => {
          element.parentNode.remove()
        })


    }
}





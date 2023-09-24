function alertTemplate(data) {
    const alertList = document.createElement("section");
    data.forEach(alert => {
        const pElement = document.createElement("p");
        pElement.style.background = alert.Background;
        pElement.style.color = alert.Color;
        pElement.textContent = alert.AlertMessage;
        alertList.appendChild(pElement);
    });
    document.querySelector("main").insertAdjacentElement("beforebegin", alertList);
}


export default class Alert {
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
    }

    async fetchAlertData() {
        try {
            const response = await fetch(this.path);
            if (response.ok) {
                const data = await response.json();
                alertTemplate(data);
            }
            else {
                throw Error(await response.text());
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

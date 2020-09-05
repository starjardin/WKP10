import faker from 'faker';

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 2 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" value= "${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
		.join('');
};

//wait function
function wait (ms = 0) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
};

//delete function
async function destroyFormPopup (formPopup) {
  await wait (1000);
  formPopup.remove();
  formPopup = null;
}

const editPartner = (e) => {
	// code edit function here
  //
  const editButton = e.target.closest(".edit");
  if (editButton) {
    const tr = editButton.parentElement;
    const button = tr.querySelector(".delete");
    const id = button.value;
    editPartnerPopup(id);
  }
};

const editPartnerPopup = (id) => {
	// create edit popup here
  return new Promise(async function(resolve) {
    const formPopup = document.createElement("form");
    formPopup.classList.add("form");
    const person = persons.find(person => person.id === id);
    formPopup.insertAdjacentHTML("afterbegin", `<fieldset class="fieldset">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value="${person.lastName}">
        <label for="firstName">Frist Name</label>
        <input type="text" id="firstName" name="firstName" value="${person.firstName}">
        <label for="jobTitle">Job title</label>
        <input type="text" id="jobTitle" name="jobTitle" value="${person.jobTitle}">
        <label for="jobArea">Job Area</label>
        <input type="text" id="jobArea" name="jobArea" value="${person.jobArea}">
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" name="phone" value="${person.phone}">
        <button type="submit">save</button>
      </fieldset>
    `)
    const skipButton = document.createElement("button");
    skipButton.type="button";
    skipButton.classList.add("skip");
    skipButton.textContent = "cancel"
    formPopup.firstElementChild.appendChild(skipButton);

    skipButton.addEventListener("click", ()=> destroyFormPopup(formPopup))

    formPopup.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const newPerson = {
        id: id,
		    lastName: form.lastName.value,
		    firstName: form.firstName.value,
		    jobTitle: form.jobTitle.value,
		    jobArea: form.jobArea.value,
		    phone: form.phone.value,
		    picture: faker.image.avatar(100, 100),
      }
      const html = `<tr data-id="${newPerson.id}" value= "${newPerson.id}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${newPerson.lastName}</td>
        <td>${newPerson.firstName}</td>
        <td>${newPerson.jobTitle}</td>
        <td>${newPerson.jobArea}</td>
        <td>${newPerson.phone}</td>
        <td>
          <button class="edit" value="${person.id}">
            <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
          </button>
          <button class="delete" value="${person.id}">
            <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
          </tr>`
          const tr = tbody.querySelector(`[value="${newPerson.id}"]`);
          tr.innerHTML = html;
      destroyFormPopup(formPopup);
    }, {once: true});
    document.body.appendChild(formPopup);
      await wait(50);
    formPopup.classList.add("open");
  })
};

const deletePartner = (e) => {
	// code delete function gere
  return new Promise(function(resolve) {
    //find which button gets clicked if it matches the delete buttons
    const buttonDelete = e.target.closest(".delete");
    //if the delete buttons get clicked : do smt
    if (buttonDelete) {
      const tr = buttonDelete.parentElement;
      const button = tr.querySelector(".delete");
      const id = button.value;
      deletePopup(id);
    }
  })
};

const deletePopup = async (id) => {
	// create confirmation popup here
  return new Promise(async function(resolve) {
    const deletePopup = document.createElement("div");
    deletePopup.classList.add("deletePopup");
    //see who gets clicked here
    const person = persons.find(person => person.id === id);
    //inner html for warning
    deletePopup.insertAdjacentHTML("afterbegin", `
        <p>Are you sure you want to delete ${person.firstName} ${person.lastName}</p>
    `)
    //create buttons here for yes or cancel, will listen for smt from them that is why we created them this way.
    const cancelButton  = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "cancel";
    const yesButton  = document.createElement("button");
    yesButton.type = "button";
    yesButton.textContent = "yes";
    //append the buttons to the div popup
    deletePopup.appendChild(yesButton);
    deletePopup.appendChild(cancelButton);
    deletePopup.classList.add("open");
    //append the div popup to the document
    document.body.appendChild(deletePopup);
    yesButton.addEventListener("click", (e) => {
      //take who gets clicked
      const deletedPerson = tbody.querySelector(`[value="${person.id}"]`);
      // and remove him
      deletedPerson.remove();
      deletePopup.classList.remove("open");
    });

    //do just remove the class open and do nothing here
    cancelButton.addEventListener("click", e => {
      deletePopup.classList.remove("open");
    });

    //close modal by escape key
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        deletePopup.classList.remove("open");
      }
    })
  })
};


//event listeners
tbody.addEventListener("click", editPartner);
tbody.addEventListener("click", deletePartner);
displayList(persons);
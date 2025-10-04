const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputfields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


checkBoxList.forEach( (checkbox)=>{

    checkbox.addEventListener("click",(e)=>{

        const allGoalsAdded = [...inputfields].every((input)=>{
            return input.value
        })

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed')
            progressValue.style.visibility = 'visible'
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            localStorage.setItem('allGoals',JSON.stringify(allGoals));
        }
        else{
            errorLabel.parentElement.classList.add('show-error')
        }
    })
})

inputfields.forEach((input)=>{

    if(allGoals[input.id].completed){
        input.parentNode.classList.add('completed')
    }

    input.value = allGoals[input.id].name

    input.addEventListener("focus",(e)=>{
        errorLabel.parentElement.classList.remove('show-error')
    })

    input.addEventListener('input', (e)=>{
        allGoals[input.id] = {   
            name : e.target.value,
            completed : false,    
        };

        localStorage.setItem('allGoals',JSON.stringify(allGoals)); 

    })
})


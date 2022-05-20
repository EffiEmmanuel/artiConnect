const servicesDropdown = document.querySelector('.listServices')
const accountDropdown = document.getElementById('account')
const dropdownItems = document.querySelector('.list-services-dropdown')
const accountItems = document.querySelector('.account-dropdown')
const dummy = document.querySelector('.dummy')

// Event listeners
if(accountDropdown !== null) {
    accountDropdown.addEventListener('click', () => switchAccountDropDown(accountItems, dropdownItems))
}

if(servicesDropdown !== null) {
    servicesDropdown.addEventListener('click', () => switchAccountDropDown(dropdownItems, accountDropdown ? accountItems : dummy))
}

if (dropdownItems !== null) {
    dropdownItems.addEventListener('mouseleave', () => closeDropdown(dropdownItems))
}

if(accountItems !== null) {
    accountItems.addEventListener('mouseleave', () => closeDropdown(accountItems))    
}

console.log('inside script')

function switchAccountDropDown(dropdownElement, secondDropdown) {
    console.log('Clicking on Account')
    if(accountDropdown == null) {
        console.log('no account for here o!')
    }
    if (secondDropdown.style.display === 'block') secondDropdown.style.display = 'none'
    dropdownElement.style.display === 'block' ? dropdownElement.style.display = 'none' : dropdownElement.style.display = 'block'
}

function closeDropdown(dropdownElement) {
    dropdownElement.style.display = 'none'
}


// Error and Success messages
// const errorParagraph = document.getElementById('error')
// const successParagraph = document.getElementById('success')

// errorParagraph.addEventListener('change', function () {
//     if (errorParagraph.innerHTML === '') {
//         errorParagraph.classList.remove = 'error'
//         errorParagraph.style.display = 'none'
//     } else {
//         errorParagraph.classList.add = 'error'
//         errorParagraph.style.display = 'block'
//     }
// })


// Search bar animation, fade and scale in
const searchTrigger = document.getElementById('searchTrigger')
searchTrigger.addEventListener('click', showSearch)

const searchBar = document.getElementById('searchBar')
// searchTrigger.addEventListener('', hideSearch)

const overlay = document.querySelector('.overlay')
overlay.addEventListener('click', hideSearch)


function showSearch() {
    searchBar.style.display = 'block'
    searchBar.style.transform = 'scale(1.2)'
    searchTrigger.style.opacity = '0'
    overlay.style.display = 'block'
}

function hideSearch() {
    overlay.style.display = 'none'
    searchBar.style.transform = 'scale(1)'
    searchBar.style.display = 'none'
    searchTrigger.style.opacity = '1'
    searchTrigger.style.display = 'block'
}

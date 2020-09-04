const showError = (message) => {
    const errorMsg = message ? message : 'Oops! sorry something went wrong. please entery location as valid city name only'
    return `
        <div class="error">
            ${errorMsg}
        </div>
    `
}

export default showError
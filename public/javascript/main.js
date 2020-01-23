function activateDescription(id) {
    let itemId = id + '-item'
    const item = document.getElementById(itemId)

    if (item.children[0].classList.value === 'hidden') {
        item.children[0].classList.remove('hidden')
        item.children[1].classList.add('hidden')
    } else {
        item.children[0].classList.add('hidden')
        item.children[1].classList.remove('hidden')
    }
}
document.addEventListener("DOMContentLoaded", function () {
    technologyFilter();
    consultantsFilter();
});

function technologyFilter() {
    const checkboxes = document.querySelectorAll("#technology-section .options input[type='checkbox']");
    const searchInput = document.querySelector("#technology-section .grid-serach input[type='search']");
    const resetButton = document.querySelector("#technology-section .resetfilter");
    const technologyItems = document.querySelectorAll("#technology-section .item-sec");

    function filterItems() {
        const checkedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);

        technologyItems.forEach(item => {
            const itemCategories = item.getAttribute("data-category").split(' ');
            const isItemVisible = itemCategories.some(category => checkedCategories.includes(category));
            item.style.display = isItemVisible || checkedCategories.length === 0 ? '' : 'none';
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterItems);
    });

    resetButton.addEventListener("click", function() {
        checkboxes.forEach(checkbox => checkbox.checked = true);
        searchInput.value = '';
        filterItems();
    });

    searchInput.addEventListener("input", function() {
        const searchText = this.value.toLowerCase();
        technologyItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchText) ? '' : 'none';
        });
    });
}

function consultantsFilter() {
    const checkboxes = document.querySelectorAll("#consultants-section .options input[type='checkbox']");
    const searchInput = document.querySelector("#consultants-section .grid-serach input[type='search']");
    const resetButton = document.querySelector("#consultants-section .resetfilter");
    const consultantItems = document.querySelectorAll("#consultants-section .item-sec");

    function filterItems() {
        const checkedRegions = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);
        const searchText = searchInput.value.toLowerCase();

        consultantItems.forEach(item => {
            const itemRegion = item.getAttribute("data-category");
            const text = item.textContent.toLowerCase();
            const isVisible = checkedRegions.includes(itemRegion) && text.includes(searchText);
            item.style.display = isVisible ? '' : 'none';
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterItems);
    });

    resetButton.addEventListener("click", function() {
        checkboxes.forEach(checkbox => checkbox.checked = true);
        searchInput.value = '';
        filterItems();
    });

    searchInput.addEventListener("input", function() {
        filterItems();
    });
}

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const customerName = document.getElementById('customerName');
    const phoneNumber = document.getElementById('phoneNumber');
    const deluxe9kg = document.getElementById('deluxe9kg');
    const deluxe20kg = document.getElementById('deluxe20kg');
    const deluxeAmount = document.getElementById('deluxeAmount');
    const doubleWashAmount = document.getElementById('doubleWashAmount');
    const discount = document.getElementById('discount');
    const total = document.getElementById('total');
    
    // Buttons
    const calculateBtn = document.getElementById('calculateBtn');
    const printBtn = document.getElementById('printBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Form fields and radio buttons
    const ezInsiderRadios = document.querySelectorAll('input[name="ezInsider"]');
    const fabricSheetsRadios = document.querySelectorAll('input[name="fabricSheets"]');
    const doubleWashRadios = document.querySelectorAll('input[name="doubleWash"]');
    
    // Predefined prices (can be adjusted as needed)
    const prices = {
        deluxe9kg: 50.00,
        deluxe20kg: 90.00,
        doubleWash: 20.00,
        fabricSheets: 5.00
    };

    // Initialize the form
    initializeForm();

    // Event listeners
    if (calculateBtn) calculateBtn.addEventListener('click', calculateTotal);
    if (printBtn) printBtn.addEventListener('click', printBill);
    if (resetBtn) resetBtn.addEventListener('click', resetForm);

    // Handle automatic calculations when options change
    deluxe9kg.addEventListener('change', updateDeluxeAmount);
    deluxe20kg.addEventListener('change', updateDeluxeAmount);
    
    doubleWashRadios.forEach(radio => {
        radio.addEventListener('change', updateDoubleWashAmount);
    });
    
    fabricSheetsRadios.forEach(radio => {
        radio.addEventListener('change', calculateTotal);
    });
    
    // Add event listener for discount changes
    discount.addEventListener('input', calculateTotal);
    
    // Highlight fields on focus for better user experience
    const allInputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="number"]');
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('highlight-group');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('highlight-group');
        });
    });

    // Initialize form with default values
    function initializeForm() {
        // Set current date at the top of the form
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // You can add a date field to the form if needed
        // dateField.value = formattedDate;
        
        // Set default values
        deluxeAmount.value = '';
        doubleWashAmount.value = '';
        discount.value = '';
        total.value = '';
    }

    // Calculate and update the deluxe wash amount
    function updateDeluxeAmount() {
        let amount = 0;
        if (deluxe9kg.checked) amount += prices.deluxe9kg;
        if (deluxe20kg.checked) amount += prices.deluxe20kg;
        
        deluxeAmount.value = amount > 0 ? amount.toFixed(2) : '';
        calculateTotal();
        
        // Visual feedback
        flashElement(deluxeAmount);
    }

    // Calculate and update the double wash amount
    function updateDoubleWashAmount() {
        const doubleWashYes = document.querySelector('input[name="doubleWash"][value="Y"]');
        
        if (doubleWashYes && doubleWashYes.checked) {
            doubleWashAmount.value = prices.doubleWash.toFixed(2);
        } else {
            doubleWashAmount.value = '';
        }
        
        calculateTotal();
        
        // Visual feedback
        flashElement(doubleWashAmount);
    }

    // Calculate the total amount
    function calculateTotal() {
        // Get all values
        const deluxeValue = parseFloat(deluxeAmount.value) || 0;
        const doubleWashValue = parseFloat(doubleWashAmount.value) || 0;
        const discountValue = parseFloat(discount.value) || 0;
        
        // Check for fabric sheets
        let fabricSheetsCost = 0;
        const fabricSheetsYes = document.querySelector('input[name="fabricSheets"][value="Y"]');
        if (fabricSheetsYes && fabricSheetsYes.checked) {
            fabricSheetsCost = prices.fabricSheets;
        }
        
        // Calculate the final total
        const subtotal = deluxeValue + doubleWashValue + fabricSheetsCost;
        const totalValue = subtotal - discountValue;
        
        // Update the total field
        total.value = totalValue.toFixed(2);
        
        // Visual feedback
        flashElement(total);
    }
    
    // Add visual feedback when a value changes
    function flashElement(element) {
        if (!element) return;
        
        element.classList.add('highlight-value');
        setTimeout(() => {
            element.classList.remove('highlight-value');
        }, 700);
    }

    // Print the bill
    function printBill() {
        // If needed, verify required fields are filled
        if (!validateForm()) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Print the page
        window.print();
    }

    // Validate form before printing
    function validateForm() {
        // Add any validation rules you need
        if (!customerName.value.trim()) return false;
        if (!phoneNumber.value.trim()) return false;
        
        // Check if at least one service is selected
        if ((!deluxe9kg.checked && !deluxe20kg.checked) && 
            !document.querySelector('input[name="doubleWash"][value="Y"]').checked) {
            return false;
        }
        
        return true;
    }

    // Reset the form
    function resetForm() {
        document.getElementById('billForm').reset();
        
        // Reset calculated fields
        deluxeAmount.value = '';
        doubleWashAmount.value = '';
        discount.value = '';
        total.value = '';
    }
});

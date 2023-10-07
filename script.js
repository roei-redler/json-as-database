// Fetch records from API
async function fetchRecords() {
    try {
      const response = await fetch('records.json');
      const records = await response.json();
      return records; 
    } catch (error) {
      console.error(error);
    }
  }
  
  // Display records in DOM
  function displayRecords(records) {
    const recordList = document.getElementById('recordList');
    
    records.forEach(record => {
      const listItem = document.createElement('li');
      listItem.textContent = `${record.name} - ${record.email}`;
      recordList.appendChild(listItem); 
    });
  }
  
  // Clear form fields
  function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
  }
  
  // Validate and save record
  async function saveRecord(record) {
    try {
      const records = await fetchRecords();
      records.push(record);
      
      await fetch('records.json', {
        method: 'POST',
        body: JSON.stringify(records)
      });
      
      displayRecords(records);
      clearForm();
      alert('Record saved!');
    } catch (error) {
      console.error(error);
    }
  }
  
  // Event listener for form submit
  document.getElementById('recordForm').addEventListener('submit', event => {
    event.preventDefault();
    
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    
    const record = { name, email };
    
    saveRecord(record);
  });
  
  // Fetch and display records on load
  fetchRecords().then(displayRecords);
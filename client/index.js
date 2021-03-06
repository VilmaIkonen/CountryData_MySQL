document.addEventListener('DOMContentLoaded', function () {
	fetch('http://localhost:5000/getAll')
	.then(response => response.json())
	.then(data => loadHTMLTable(data['data']));
    
});

// document.querySelector('table tbody').addEventListener('click', function(event) {
// 	if (event.target.className === "delete-row-btn") {
// 		deleteRowById(event.target.dataset.id);
// 	}
// 	if (event.target.className === "edit-row-btn") {
// 		handleEditRow(event.target.dataset.id);
// 	}
// });

const searchBtn = document.querySelector('#searchBtn');

searchBtn.onclick = function() {
	const searchValue = document.querySelector('#searchInput').value;

	fetch('http://localhost:5000/search/' + searchValue)
	.then(response => response.json())
	.then(data => loadHTMLTable(data['data']));
}

// function deleteRowById(id) {
// 	fetch('http://localhost:5000/delete/' + id, {
// 		method: 'DELETE'
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 		if (data.success) {
// 				location.reload();
// 		}
// 	});
// }

// const addBtn = document.querySelector('#add-code-btn');

// addBtn.onclick = function () {
// 	const codeInput = document.querySelector('#code-input');
// 	const code = codeInput.value;
// 	codeInput.value = "";

// 	fetch('http://localhost:5000/insert', {
// 			headers: {
// 				'Content-type': 'application/json'
// 		},
// 		method: 'POST',
// 		body: JSON.stringify({ code : code})
// 	})
// 	.then(response => response.json())
// 	.then(data => insertRowIntoTable(data['data']));
// }

// function insertRowIntoTable(data) {
// 	console.log(data);
// 	const table = document.querySelector('table tbody');
// 	const isTableData = table.querySelector('.no-data');

// 	let tableHtml = "<tr>";

// 	for (var key in data) {
// 		if (data.hasOwnProperty(key)) {
// 			if (key === 'dateAdded') {
// 				data[key] = new Date(data[key]).toLocaleDateString('en-GB');
// 			}
// 			tableHtml += `<td>${data[key]}</td>`;
// 		}
// 	}

// 	tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
// 	tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

// 	tableHtml += "</tr>";

// 	if (isTableData) {
// 		table.innerHTML = tableHtml;
// 	} 
// 	else {
// 		const newRow = table.insertRow();
// 		newRow.innerHTML = tableHtml;
// 	}
// }

function loadHTMLTable(data) {
	const table = document.querySelector('table tbody');

	if (data.length === 0) {
		table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
		return;
	}

	let tableHtml = "";

	data.forEach(function ({Code, Name, LocalName, Population}) {
		tableHtml += "<tr>";
		tableHtml += `<td>${Code}</td>`;
		tableHtml += `<td>${Name}</td>`;
		tableHtml += `<td>${LocalName}</td>`;
		tableHtml += `<td>${Population}</td>`;
		tableHtml += "</tr>";
	});

	table.innerHTML = tableHtml;
}
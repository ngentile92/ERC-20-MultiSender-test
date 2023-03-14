document.addEventListener("DOMContentLoaded", () => {
  App.init();
  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
});

const keys = {
  'address': 0,
  'amount': 1
}

const MapDataFileForTable = (values) => {
  values = values.slice(1)
  const list = values.map((rowData) => ({
    ...rowData
  }))
  return list
}

const orderData = (valuesFile) => {
  const keysSorted = Object.keys(keys).sort(function (a, b) {
    return keys[a] - keys[b]
  })
  const mapped = valuesFile.map((val) =>
    val.reduce((acc, cur, i) => ({ ...acc, [keysSorted[i]]: cur }), {})
  )
  return(mapped)
}

function handleFileSelect(event) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
  console.log(event);
  console.log('evet.target.res', event.target.result)
    var array = event.target.result.split('\n').map((x) => x.split(','))
    console.log('finish', array)
  let fileData = orderData(array)
  let fileDataToMap =  MapDataFileForTable(fileData)
  document.getElementById('fileContent').innerHTML = fileDataToMap.map(data => 
    `<div class="card bg-dark rounded-0 mb-5">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Address= ${data.address}</span>
          <span>Amount= ${data.amount}</span>
        </div>
      
      </div>`
).join('')
  
}

/**
 * Task form
 */
const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('andaono', e.target)
});



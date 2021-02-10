
async function volunteer(id) {
    await fetch(`/api/volunteer/${id}`, {
            method: 'put'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success === true) {
                renderProjectInfo(data.data)
            } else {
                alert(data.error)
            }
        })
        .catch(console.error)


} 
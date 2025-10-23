import React from 'react'

const UserHome = () => {


  const url = 'https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '62bb65bd21msh9f5369af392a1bdp195890jsn33d2cac32d39',
		'x-rapidapi-host': 'jsearch.p.rapidapi.com'
	}
};

const fetchData = async()=>{
  try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}


}

fetchData()

console.log("hi")


  return (
    <div className='h-screen '>UserHome</div>
  )
}

export default UserHome
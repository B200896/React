// let prom = fetch("https://dummyjson.com/products");

// prom
//   .then((data) => {
//     let again_prom = data.json();
//     again_prom.then((inner_data) => {
//       let get_all_title = inner_data.products.filter((item)=>{
//         return item.title.includes("iPhone")
//       })

//       console.log(get_all_title)

//     });
//   })
//   .catch();


// async function Output(){

//     let prom = await fetch('https://dummyjson.com/products');
//     let data = await prom.json();
//     let get_brand = data.products.map((item)=>{
         
//         return item.brand.toLowerCase() + " " + item.brand.length;
//     })
//     console.log(get_brand)
// }

// Output()
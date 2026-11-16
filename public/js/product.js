const onSubmitHandler = (e) => {
  e.preventDefault();

  console.log("submit function called");

  const product = e.target.productName.value;

  const obj = {
    "productName": product,
  };

  axios
    .post("http://localhost:4000/api/products", obj)
    .then((result) => {
      console.log("Product added:", result.data);
      e.target.reset();
    })
    .catch((err) => {
      console.error("Error adding product:", err);
    });
};

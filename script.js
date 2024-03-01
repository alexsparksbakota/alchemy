const image_input = document.querySelector("#image_input");
var uploaded_image = "";
image_input.addEventListener("change", function() {
    const reader  = new FileReader();
    reader.addEventListener("load", () =>{
        uploaded_image = reader.result;
        document.querySelector("#image_preview").style.backgroundImage = `url(${uploaded_image})`
        $("#spnMessage").html("Image Uploaded");
    });
    reader.readAsDataURL(this.files[0]);
    alert("Image uploaded successfully");
})

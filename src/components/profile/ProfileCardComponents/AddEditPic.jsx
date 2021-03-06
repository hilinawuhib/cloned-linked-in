import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { GrFormEdit } from "react-icons/gr";
import { axios } from "axios";
const AddEditPic = ({
  showAddEditPic,
  handleCloseAddEditPic,
  profileImg,
  fetchProfile,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    handleCloseAddEditPic();
    formData.append("image", selectedFile);

    console.log(formData);

    try {
      let response = await fetch(
        process.env.REACT_APP_MAIN_USER +
          `/profiles/6214d6eedc5924e6a8291a06/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        let data = await response.json();
        console.log("successfully Uploaded", data);
        fetchProfile();
      } else {
        console.log("error on uploading");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Modal
      show={showAddEditPic}
      onHide={handleCloseAddEditPic}
      animation={true}
      className="w-100"
    >
      <Modal.Dialog className="w-100 border-0 px-3">
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between  align-items-center">
            <div
              style={{ width: "100px", height: "100px", marginBottom: "20px" }}
            >
              <img
                className="w-100 "
                src={selectedFile || profileImg}
                alt="change profile pic"
              />
              <input type="file" id="photo" onChange={(e) => handleChange(e)} />
              {selectedFile && (
                <div>
                  <p>{selectedFile.name}</p>
                  <p className="mb-5">{selectedFile.type}</p>{" "}
                </div>
              )}
            </div>
            <button
              className="bg-success text-white pointer round-border grey-border p-2 h-100"
              onClick={(e) => handleUpload(e)}
            >
              upload
            </button>
          </div>

          <div className="d-flex justify-content-between text-center px-2 mt-5 border-top pt-2">
            <div className="d-flex">
              <div className="d-flex flex-column grey-hover round-border px-2 pt-1 mx-2">
                <span>
                  <i className="bi bi-pencil-fill"></i>
                </span>
                <span>Edit</span>
              </div>
              <div className="d-flex flex-column grey-hover round-border  px-2 pt-1 mx-2">
                <span>
                  <i className="bi bi-camera-fill" />
                </span>
                <span>Add Photo</span>
              </div>
              <div className="d-flex flex-column grey-hover round-border px-2 pt-1  mx-2">
                <span>
                  <i className="bi bi-image-fill" />
                </span>
                <span>Frame</span>
              </div>
            </div>
            <div className="grey-hover round-border  px-2 pt-1 d-flex">
              <div className="d-flex flex-column mx-2">
                <span>
                  <i className="bi bi-trash-fill" />
                </span>
                <span>Delete</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default AddEditPic;

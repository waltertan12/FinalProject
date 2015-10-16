(function (root) {
  if (typeof root.TrackUpload === "undefined") {
    root.TrackUpload = {};
  }

  var Link = ReactRouter.Link;
  root.TrackUpload = React.createClass({
    getInitialState: function () {
      return (
        {
          title: "",
          description: "",
          tags: ""
        }
      );
    },
    updateTitle: function (e) {
      var value = e.target.value,
          newState = this.state;
      newState.title = value;
      this.setState(newState);
    },
    updateDescription: function (e) {
      var value = e.target.value,
          newState = this.state;
      newState.description = value;
      this.setState(newState);
    },
    updateTrackFile: function (e) {
      this.audioFile = e.target;
    },
    updateImageFile: function (e) {
      this.imageFile = e.target;
    },
    _onSubmit: function (e) {
      e.preventDefault();

      var audioFile = this.audioFile.files[0],
          audioFormData = new FormData(),
          imageFormData = new FormData();

      audioFormData.append("upload_preset", window.CLOUDINARY_PRESET);
      audioFormData.append("file", audioFile);

      if (typeof this.imageFile !== "undefined") {
        imageFormData.append("upload_preset", window.CLOUDINARY_PRESET);
        imageFormData.append("file", imageFile);
      } else {
        imageFormData = undefined;
      }

      TrackActions.uploadTrack({
        metadata: this.state,
        audio: audioFormData,
        image: imageFormData
      });
    },
    render: function () {
      return (
        <div className="container track-upload col-md-6 col-md-offset-3">
          <h1>Upload a new Track!</h1>
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <label>Title</label><br/>
              <input type="text"
                     className="form-control"
                     onChange={this.updateTitle}/>
            </div><br/><br/>

            <div className="form-group">
              <label>Tags</label><br/>
              <input type="text"
                     className="form-control"
                     onChange={this.updateTags}/>
            </div><br/><br/>

            <div className="form-group">
              <label>Description</label><br/>
              <textarea rows="5"
                        className="form-control"
                        onChange={this.updateDescription}/>
            </div><br/><br/>



            <div className="form-group">
              <label>Choose a file</label><br/>
              <input type="file"
                     className="track-upload-input"
                     accept="audio/*"
                     onChange={this.updateTrackFile}/>
            </div><br/><br/>

            <div className="form-group">
              <label>Upload an image <em>(optional)</em></label><br/>
              <input type="file"
                     accept="image/*"
                     onChange={this.updateImageFile}/>
            </div><br/><br/>

            <input type="submit" 
                   className="btn btn-success" 
                   value="Upload!"/>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        </div>
      )
    }
  });
})(this);
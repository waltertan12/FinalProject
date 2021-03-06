(function (root) {
  if (typeof root.TrackUpload === "undefined") {
    root.TrackUpload = {};
  }

  var Link = ReactRouter.Link;
  root.TrackUpload = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function () {
      return (
        {
          title: "",
          description: "",
          tags: "",
          image_url: ""
        }
      );
    },
    componentDidMount: function () {
      ErrorStore.addChangeListener(this.setErrors);
      this.tagInput = new Taggle("tag-field", 
        {tags: [
          "wow", 
          "such track", 
          "very sound",
          "much cloud"
        ], duplicateTagClass: 'bounce'}
      );
    },

    componentWillUnmount: function () {
      ErrorStore.removeChangeListener(this.setErrors);
    },
    setErrors: function  () {
      var node = React.findDOMNode(document.getElementById("errors"));
      React.render(<ErrorDisplay errors={ErrorStore.all()}/>, node);
      this.setState({errors: ErrorStore.all()});
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
      var value = e.target.value,
          newState = this.state;
      newState.image_url = value;
      this.setState(newState);
    },
    validate: function (title, audiofile) {
      errors = [];
      if (title.length === 0) {
        errors.push("Title can't be blank");
      }
      if (typeof audiofile === "undefined") {
        errors.push("Must include audio file");
      }
      if (errors.length > 0) {
        ErrorActions.receiveErrors(errors);
      }
    },
    _onSubmit: function (e) {
      e.preventDefault();
      this.validate(this.state.title, this.audioFile);

      var audioFile = this.audioFile.files[0],
          audioFormData = new FormData(),
          tags = this.tagInput.getTagValues();

      audioFormData.append("upload_preset", window.CLOUDINARY_PRESET);
      audioFormData.append("file", audioFile);

      TrackActions.uploadTrack({
        metadata: this.state,
        audio: audioFormData,
        tags: tags
      });

      this.history.pushState(null, "/tracks/progress");
    },
    render: function () {
      var cancel = "No, I don't want to share my awesome tunes :(";
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

            <div>
              <label>Tags</label><br/>
              <div id="tag-field"
                   className="textarea input clearfix"
                   placeholder="enter tag">
              </div>
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
              <label>Track Image URL<em>(optional)</em></label><br/>
              <input type="text"
                     className="form-control"
                     accept="image/*"
                     onChange={this.updateImageFile}/>
            </div><br/><br/>

            <input type="submit" 
                   className="btn btn-success"
                   value="Upload!"/>&nbsp;
            <Link to="/" className="btn btn-danger">{cancel}</Link>
          </form>
        </div>
      )
    }
  });
})(this);
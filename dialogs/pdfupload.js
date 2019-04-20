CKEDITOR.dialog.add("pdfuploadDialog", function (editor) {
  return {
    title: "PDF Upload",
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: "upload_pdf_dialog",
        label: "Upload PDF",
        elements: [
          {
            type: "html",
            html: '<input type="file" id="pdffileuploadinput" />'
          },
          {
            type: 'text',
            id: 'pdf_alt_text',
            label: 'Text'
          }, {
            type: 'radio',
            id: 'pdf_target',
            label: 'Open PDF on Tab?',
            items: [['Self', '_self'], ['New Tab', '_blank']],
            'default': '_blank'
          }
        ]
      }
    ],
    onOk: function () {
      dialogbox = this;
      dialogElement = dialogbox.getElement();
      var formData = new FormData();
      formData.append("_csrf", document.getElementById("csrftocken").value);
      formData.append(
        "fileToUpload",
        dialogElement.$.getElementsByTagName("input")[0].files[0]
      );
      let text = dialogbox.getValueOf('upload_pdf_dialog', 'pdf_alt_text');
      let filename = dialogElement.$.getElementsByTagName("input")[0].files[0].name;
      let target = dialogbox.getValueOf('upload_pdf_dialog', 'pdf_target');
      $.ajax({
        type: "POST",
        url: "/social-post/pdf_upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (r) {
          if (r.state) {
            let attr = (target.length > 0) ? 'target="' + target + '"' : "";

            // if any name added for pdf link
            if (text.length > 0) {
              editor.insertHtml(
                '<object data="' + r.src + '" type="application/pdf" width="100%" height="100%"><a ' + attr + ' href = "' + r.src + '">' + text + '</a></object>'
              );
            }
            else {
              editor.insertHtml(
                '<object data="' + r.src + '" type="application/pdf" width="100%" height="100%"><a ' + attr + ' href = "' + r.src + '">' + filename + '</a></object>'
              );
            }
          }
          else {
            console.log(r.msg);
          }
        }
      });
    }
  };


});

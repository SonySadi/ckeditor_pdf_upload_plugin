CKEDITOR.plugins.add("pdfupload", {
  icons: "pdfupload",
  init: function(editor) {
    //Plugin logic goes here.
    /* editor.addCommand("pdfupload", {
      exec: function(editor) {
        editor.insertHtml("it's a image");
      }
    }); */
    CKEDITOR.dialog.add("pdfuploadDialog", this.path + "dialogs/pdfupload.js");
    editor.addCommand(
      "pdfupload",
      new CKEDITOR.dialogCommand("pdfuploadDialog")
    );
    editor.ui.addButton("pdfupload", {
      label: "Upload PDF",
      command: "pdfupload",
      toolbar: "insert"
    });
  }
});

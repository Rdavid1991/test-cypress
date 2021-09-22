export const userElements = {
    labels: {
        title: ".mb-5 > :nth-child(1) > .text-center",
    },
    buttons: {
        addUser: ".mb-5 > :nth-child(1) > :nth-child(2) > .btn",
        saveUser: ".btn-success",
        savePassword : ".justify-content-around > :nth-child(2) > .btn",
        alertConfirm: ".swal2-confirm",
        viewPassword1:
            ":nth-child(1) > .col > .input-group > .input-group-prepend > .input-group-text",
        viewPassword2:
            ":nth-child(2) > .col > .input-group > .input-group-prepend > .input-group-text",
    },
    fields: {
        name: "#name",
        surname: "#surname",
        email: "#email",
        username: "#username",
        mobilephone: "#mobilephone",
        newPassword: "#nwpass",
        repeatPassword: "#rptpass",
    },
    selects: {
        role: "#role",
        institution: "#institution",
    },
    alert: {
        feedbackPassword1:
            ":nth-child(1) > .col > .input-group > .invalid-feedback",

        feedbackPassword2:
            ":nth-child(2) > .col > .input-group > .invalid-feedback",
    },
    fixed: {
        recoverPwdTitle: ".card-title",
    },
};

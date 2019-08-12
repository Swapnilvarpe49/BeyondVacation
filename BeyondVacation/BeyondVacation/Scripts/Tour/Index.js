var IsNameValid = false, IsDestinationValid = false, IsDaysValid = false, IsNightValid = false, IsCostValid = false;
var fileCounter = 0;
var Images = [];
var controlsTour = [
    { control: '#txtTourName', errorMessage: 'Please Enter Tour Name', lblControl: '#lblTourName' },
    { control: '#txtDestination', errorMessage: 'Please Enter Destination', lblControl: '#lblDestination' },
    { control: '#ddlCountry', errorMessage: 'Please Select Country', lblControl: '#lblCountryList' },
    { control: '#txtDays', errorMessage: 'Please Enter Number of Days', lblControl: '#lblDays' },
    { control: '#txtNights', errorMessage: 'Please Enter Number of Neights', lblControl: '#lblNights' },
    { control: '#txtCost', errorMessage: 'Please Enter Cost', lblControl: '#lblCost' }
];
$(document).ready(function () {
    uploadImage();
    Common.AttachChangeListener(controlsTour);
    AttachListeners();
});
function uploadImage() {
    var button = $('.images .pic')
    var uploader = $('<input type="file" accept="image/*" />')
    var images = $('.images')

    button.on('click', function () {
        uploader.click()
    })

    uploader.on('change', function () {
        debugger
        var reader = new FileReader()
        reader.onload = function (event) {
            images.prepend('<div class="img" style="background-image: url(\'' + event.target.result + '\');" rel="' + event.target.result + '"><span>remove</span></div>')
        }
        reader.readAsDataURL(uploader[0].files[0])
        Images.push(uploader[0].files[0]);
    })

    images.on('click', '.img', function () {
        $(this).remove();
    })

}
function AttachListeners() {
    $('#txtTourName').focusout(function () {
            if ($(this).val() != '') {
                if (!Common.ContainsOnlyAphabets('#txtTourName')) {
                    $('#lblTourName').text('Invalid  Tour Name').css("display", "block");
                    IsNameValid = false;
                    return false;
                }
                else
                {
                    $('#lblTourName').text('').css("display", "none");
                    IsNameValid = true;
                }

            }

    });
    $('#txtDestination').focusout(function () {
        if ($(this).val() != '') {
            if (!Common.ContainsOnlyAphabets('#txtDestination')) {
                $('#lblDestination').text('Invalid  Destination').css("display", "block");
                IsDestinationValid = false;
                return false;
            }
            else {
                $('#lblDestination').text('').css("display", "none");
                IsDestinationValid = true;
            }

        }

    });
    $('#txtDays').focusout(function () {
        if ($(this).val() != '') {
            if (!Common.ContainsOnlyNumber('#txtDays')) {
                $('#lblDays').text('Invalid Number of Days').css("display", "block");
                IsDaysValid = false;
                return false;
            }
            else {
                $('#lblDays').text('').css("display", "none");
                IsDaysValid = true;
            }

        }

    });
    $('#txtNights').focusout(function () {
        if ($(this).val() != '') {
            var days = +$('#txtNights').val() + 1;
            $('#txtDays').val(days);
            if (!Common.ContainsOnlyNumber('#txtNights')) {
                $('#lblNights').text('Invalid Number of Nights').css("display", "block");
                IsNightValid = false;
                return false;
            }
            else {
                $('#lblNights').text('').css("display", "none");
                IsNightValid = true;
            }
        }
    });
    $('#txtCost').focusout(function () {
        if ($(this).val() != '') {
            if (!Common.ContainsOnlyNumber('#txtCost')) {
                $('#lblCost').text('Invalid Cost').css("display", "block");
                IsCostValid = false;
                return false;
            }
            else {
                $('#lblCost').text('').css("display", "none");
                IsCostValid = true;
            }
        }
    });
    $('#btnSaveDetails').click(function () {
        SaveTourDetails();
        });
    }
function Failed(response) {
    $('.loader-bg').hide();
    swal('Something went wrong ', '', 'error');
}
function SaveTourDetails() {
    debugger;
    var isValid = true;
    isValid = Common.ValidateEmptyFields(controlsTour);
   
    if (isValid & IsNameValid & IsDestinationValid & IsDaysValid & IsNightValid & IsCostValid) {
        swal({
            title: "Confirm",
            text: "Do you want to save Data?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(
    (addbook) => {
        if (addbook) {
            $(".loader-bg").show();
            var formData = new FormData();
            for (var i = 0; i < Images.length; i++) {
                formData.append("fileInput", Images[i]);
            }
            var Details = {
                TourName: $('#txtTourName').val(),
                Destination: $('#txtDestination').val(),
                CountryId: parseFloat($('#ddlCountry').val()),
                Days: parseFloat($('#txtDays').val()),
                Nights: parseFloat($('#txtNights').val()),
                Cost: parseFloat($('#txtCost').val())
            }
            
            formData.append('TourData', JSON.stringify(Details));
            var SaveTourDetails = {
                url: "/Tour/SaveTourDetails",
                //header: { 'VerificationToken': $("#forgeryToken").val() },
                data: formData,
                onSuccess: function onSuccess(response) {
                    $(".loader-bg").hide();
                    debugger
                    if (response.success) {
                        swal("Details saved", "Tour Code is " + response.tourCode, "success");
                    }
                
                },
                onError: function (response) {
                    debugger
                    console.log(response.responseText);
                    swal("Something went wrong.Please try again later.", "", "error");
                    $(".loader-bg").hide();
                }
            }
            Common.AjaxPostFile(SaveTourDetails);
        }
    });
    }
};
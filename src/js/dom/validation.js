export default () => {
    $("form[name='form-order']").each(function () {
        $(this).validate({
            rules: {
                'form-from': 'required',
                'form-to': 'required',
                'form-date': 'required',
                'form-weight': 'required',
                'form-phone': 'required',
                agree: {
                    required: true,
                },
            },
            messages: {
                'form-from': 'Поле не заполнено',
                'form-to': 'Поле не заполнено',
                'form-date': 'Поле заполнено неправильно',
                'form-weight': 'Поле не заполнено',
                'form-phone': 'Поле не заполнено',
                agree: 'Выберите бюджет',
            },
        });
    });
};

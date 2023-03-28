if (document.getElementById('email-form')) {
  // === Custom Form Handling ===
  var Webflow = Webflow || [];
  Webflow.push(function () {
    // unbind webflow form handling
    document.querySelector(document).removeEventListener('submit');

    const formBlock = document.querySelector('#email-form');
    const emailField = document.querySelector('#rovo-newsletter-email');
    const checkboxField = document.querySelector('#rovo-newsletter-checkbox');

    function handleSuccess() {
      const errorCheckboxClass = document.querySelector(
        '.rovo-checkbox-field-error'
      );
      const errorEmailClass = document.querySelector('.rovo-email-field-error');
      errorCheckboxClass &&
        checkboxField.parentElement.classList.remove(
          'rovo-checkbox-field-error'
        );
      errorEmailClass &&
        emailField.parentElement.classList.remove('rovo-email-field-error');
      formBlock.classList.add('form-success');
      emailField.value = 'Thank you!';

      setTimeout(() => {
        formBlock.classList.remove('form-success');
        formBlock.reset();
        document.querySelector('#rovo-newsletter-checkbox').checked = true;
      }, 3000);
    }

    function findFields(form, result) {
      result = result || {};
      form
        .find(':input:not([type="submit"]):not([type="file"])')
        .forEach(function (i, el) {
          var field = document.querySelector(el);
          var type = field.getAttribute('type');
          var name =
            field.getAttribute('data-name') || field.getAttribute('name') || 'Field ' + (i + 1);
          var value = field.value;

          if (type === 'checkbox') {
            value = field.matches(':checked');
          } else if (type === 'radio') {
            if (result[name] === null || typeof result[name] === 'string') {
              return;
            }

            value =
              form.find(`input[name='${field.getAttribute("name")}']:checked`)
              .value || null;
          }

          if (typeof value === 'string') {
            value = $.trim(value);
          }

          result[name] = value;
        });
    }

    document.querySelector('#email-form').submit(function (evt) {
      evt.preventDefault();
      let siteId = document.querySelector('html').getAttribute('data-wf-site');
      let formUrl = 'https://webflow.com' + '/api/v1/form/' + siteId;
      let payload = {
        name: evt.currentTarget.getAttribute('data-name'),
        source: window.location.href,
        test: Webflow.env(),
        fields: {},
        fileUploads: {},
        dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
          document.querySelector('#email-form').innerHTML
        )
      };

      findFields(document.querySelector('#email-form'), payload.fields);
      const isFormValid = formBlock.checkValidity();

      if (isFormValid) {
        $.ajax({
            url: formUrl,
            data: payload,
            type: 'POST',
            dataType: 'json',
            crossDomain: true
          })
          .done((res) => {
            handleSuccess();
          })
          .fail((err) => console.log(err));
      } else {
        !emailField.checkValidity() &&
          emailField.parentElement.classList.add('rovo-email-field-error');
        !checkboxField.checkValidity() &&
          checkboxField.parentElement.classList.add(
            'rovo-checkbox-field-error'
          );
      }
    });
  });
}
import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  usernameRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import { resetPassword } from '../../api/auth';
import './ResetPasswordForm.scss';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ username: '', password: '' });

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { username } = formData.current;
    setLoading(true);

    const result = await resetPassword(username);
    setLoading(false);

    if (result.isOk) {
      navigate('/login');
      notify(notificationText, 'success', 2500);
    } else {
      notify(result.message, 'error', 2000);
    }
  }, [navigate]);

  return (
    <form className={'reset-password-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'username'}
          editorType={'dxTextBox'}
          editorOptions={usernameEditorOptions}
        >
          <RequiredRule message="username is required" />
          <usernameRule message="username is invalid" />
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            elementAttr={submitButtonAttributes}
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Reset my password'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'login-link'}>
            Return to <Link to={'/login'}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const usernameEditorOptions = { stylingMode: 'filled', placeholder: 'username', mode: 'username' };
const submitButtonAttributes = { class: 'submit-button' };

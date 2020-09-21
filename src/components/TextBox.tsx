import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import { convertToCustomElement } from '../utils/CustomElementWrapper';

const TextBox = ({
  document,
  fieldValue,
  template,
  fieldName,
  formParameters,
  key,
  responsiveLayouts,
  message,
  componentDefinition,
  componentProps
}: any) => {

  const [value, setValue] = useState();

  useEffect(() => {
    if (fieldValue) {
      setValue(fieldValue);
    } else if (componentDefinition.defaultValue) {
      setValue(componentDefinition.defaultValue);
    }
  }, []);

  return (
    <TextField
      id={key}
      label={componentDefinition.label}
      value={value}
      InputProps={{
        required: componentDefinition.mandatory,
      }}
      onChange={(e: any) => {
        const newValue = e.target.value;
        const anyWindow: any = window;
        const changedDocumentService: any = (anyWindow.FormbirdServiceInjector).get('ChangedDocumentService');

        changedDocumentService.valueChanged({
          document,
          fieldName,
          fieldValue,
          formParameters
        }, newValue);

        setValue(newValue);
      }}
      {...componentProps}
    />
  );
};

convertToCustomElement('re-text-box', TextBox);

export default TextBox;

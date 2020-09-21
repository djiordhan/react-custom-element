import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Handlebars from 'handlebars';

export const convertToCustomElement = (name: string, Component: any) => {
    
  class FtWrapper extends HTMLElement {
    document: any;
    template: any;
    fieldValue: any;
    fieldName!: string;
    formParameters: any;
    key!: number;
    message!: string;
    responsiveLayouts!: string;
    componentDefinition: any;

    mountPoint: any;

    connectedCallback() {
      let componentProps = {};

      this.mountPoint = document.createElement('div');
      this.appendChild(this.mountPoint);

      if (!this.fieldValue && this.componentDefinition.defaultValue) {
        this.fieldValue = this.componentDefinition.defaultValue;
      }

      if (this.componentDefinition.componentProps) {
        var handlebarsTemplate = Handlebars.compile(JSON.stringify(this.componentDefinition.componentProps));
        componentProps = handlebarsTemplate({
          template: this.template,
          document: this.document
        });

        componentProps = JSON.parse(componentProps + '');
      }

      ReactDOM.render(
        <Component {...{
            document: this.document,
            fieldValue: this.fieldValue,
            template: this.template,
            fieldName: this.fieldName,
            formParameters: this.formParameters,
            key: this.key,
            responsiveLayout: this.responsiveLayouts,
            message: this.message,
            componentDefinition: this.componentDefinition,
            componentProps
          }}
        />,
        this.mountPoint
      );
    }
  }

  customElements.define(name, FtWrapper);
};

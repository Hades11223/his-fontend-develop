import clientUtils from '@utils/client-utils';
import PdfImageIcon from '@resources/images/pdf-icon.png';
import DocumentIcon from '@resources/images/doc-icon.png';

let requestImage = (url, element, isAuthen, callback) => {
  if (!url) return;
  let request = new XMLHttpRequest();
  request.responseType = 'blob';
  request.open('get', url, true);
  isAuthen &&
    request.setRequestHeader('Authorization', `Bearer ${clientUtils.auth}`);
  request.onreadystatechange = (e) => {
    if (request.readyState == XMLHttpRequest.LOADING) {
      element.style.width = '40px';
      element.style.height = '40px';
      element.src = '/loading.svg';
    }
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      callback && callback(request.response);
      element.src = DocumentIcon;
      if (request.response?.type?.includes('image')) {
        element.style.width = 'calc(100% - 100px)';
        element.style.height = 'auto';
        element.src = URL.createObjectURL(request.response);
      } else {
        element.style.width = '40px';
      }
      if (request.response?.type?.includes('pdf')) {
        element.src = PdfImageIcon;
      }
      element.onload = () => {
        URL.revokeObjectURL(element.src);
      };
    }
  };
  request.send(null);
};

class AuthImg extends HTMLImageElement {
  constructor() {
    super();
    this._lastUrl = '';
  }

  static get observedAttributes() {
    return ['authSrc', 'isAuthen'];
  }

  connectedCallback() {
    let url = this.getAttribute('authSrc');
    let isAuthen = this.getAttribute('isAuthen');
    if (url !== this._lastUrl) {
      this._lastUrl = url;
      requestImage(url, this, isAuthen, (response) => {});
    }
  }
}

const customImage = () => {
  try {
    window.customElements.define('auth-img', AuthImg, { extends: 'img' });
  } catch (err) {
    // console.log('error', err)
  }
};
export default customImage;

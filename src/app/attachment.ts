import { environment } from '../environments/environment';

export class Attachment {
  constructor(
    public webName: string,
    public pageName: string,
    public fileName?: string,
    public data?: Blob
  ) {}

  url(): string {
    return `${environment.apiUrl}/webs/${this.webName}/pages/${this.pageName}/attachments/${this.fileName}`
  }
}

import { environment } from '../environments/environment';

export class Attachment {
  data?: Blob

  constructor(
    public webName: string,
    public pageName: string,
    public fileName?: string
  ) {}

  url(): string {
    return `${environment.apiUrl}/webs/${this.webName}/${this.pageName}/attachments/${this.fileName}`
  }
}

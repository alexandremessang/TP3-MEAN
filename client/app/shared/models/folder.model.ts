export class Folder {
  _id?: string;
  name?: string;
  folders?: [object];
  files?: [object];
  isFolder?: boolean;
  parent?: string;
  // level?: number;
  isPublic?: boolean;
}

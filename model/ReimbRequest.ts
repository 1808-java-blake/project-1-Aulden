export class ReimbRequest {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = '';
    resolver = '';
    status = '';
    type = '';

    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, description?: string, resolver?: string, author?: string, status?: string, type?: string){
        id && (this.id = id);
        amount && (this.amount = amount);
        submitted && (this.submitted = submitted);
        resolved && (this.resolved = resolved);
        description && (this.description = description);
        author && (this.author = author);
        resolver && (this.resolver = resolver);
        status && (this.status = status);
        type && (this.type = type);
    }
}
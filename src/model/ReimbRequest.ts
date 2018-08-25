export class ReimbRequest {
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = 0;
    resolver = 0;
    status = 0;
    type = 0;

    constructor(id?: number, amount?: number, submitted?: string, resolved?: string, description?: string, resolver?: number, author?: number, status?: number, type?: number){
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
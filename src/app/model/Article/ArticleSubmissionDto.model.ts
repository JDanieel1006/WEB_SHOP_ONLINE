export interface ArticleSubmissionDto{
    code: number;
    description: string;
    price : number;
    image: File | null;
    stock: number;
}

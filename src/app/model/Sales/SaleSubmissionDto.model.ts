import { SaleArticleSubmissionDto } from "./SaleArticleSubmissionDto.model";

export interface SaleSubmissionDto{
    storeId: number;
    customerId: number;
    articles : SaleArticleSubmissionDto[];
}

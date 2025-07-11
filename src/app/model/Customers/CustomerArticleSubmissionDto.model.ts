import { CustomerArticleStatus } from "../../enums/Customer/CustomerArticleStatus";

export interface CustomerArticleSubmissionDto{
    articleId: number;
    status : CustomerArticleStatus;
}

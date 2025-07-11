import { CustomerArticleStatus } from "../../enums/Customer/CustomerArticleStatus";

export interface CustomerArticleDto{
    customerId: number;
    articleId: number;
    createdAt: Date;
    status : CustomerArticleStatus;
}

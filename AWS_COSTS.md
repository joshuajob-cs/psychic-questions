# AWS Cost Summary

## Monthly Cost Breakdown

| Service              | Cost   | Notes                                      |
| -------------------- | ------ | ------------------------------------------ |
| EC2 t2.micro         | $0.00  | Free tier eligible (750 hrs/month)         |
| Elastic IP           | $0.00  | Free when attached to a running instance   |
| Public IPv4 address  | ~$3.60 | $0.005/hr — unavoidable AWS fee since 2024 |
| Route 53 hosted zone | $0.50  | One hosted zone for domain                 |
| Domain name (.click) | $0.25  | $3/year billed annually                    |
| Data transfer        | ~$0.50 | Varies with traffic                        |
| EBS storage          | $0.00  | Free tier covers 30GB                      |

**Estimated total: ~$4.75/month** (~$4.50 + $0.25 for domain)

## Important Notes

- **Free tier expires** 12 months after account creation — EC2 will start costing ~$7.50/month after that
- **Never stop the instance without releasing the Elastic IP** — an unattached Elastic IP costs ~$3.60/month
- **Do not launch additional EC2 instances** — free tier only covers 750 hours total across all instances
- Check free tier usage at **AWS Console → Billing → Free Tier**

## To Get Under $1/Month

Would require moving off EC2 entirely to a platform without persistent IPv4 costs:

- **S3 + CloudFront** — static sites only
- **Railway / Render / Fly.io** — support full backend apps with free tiers

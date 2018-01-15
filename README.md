# Message Report Flask App

[See deployed version here](https://reporting-ersipkxett.now.sh/ "Message Reporting")

## Notes from Nate
I think ideally,  if one had more time, this report data could be cached in Redis (or some other in-memory store) and retrieved quickly.
The data cache could then refreshed regularly depending upon need.
This is a bare-bones implementation, as time was a constraint.

### So I remember...
deploy: `$ now -e DATABASE_URL=@database_url`





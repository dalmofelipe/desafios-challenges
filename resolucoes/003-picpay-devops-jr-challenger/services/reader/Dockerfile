FROM golang:1.18.7-alpine3.16 as builder
WORKDIR /builder
ADD . .
RUN go mod download
RUN go build .

# MultStage builder
FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /builder/picpay.devops.dalmofelipe ./main
EXPOSE 8080
CMD ["./main"]
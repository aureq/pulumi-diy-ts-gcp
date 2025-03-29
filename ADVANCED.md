# Some helpful commands

## Session 1

- `gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS` to authenticate with a service account and a key file.
  This is a more advanced way to authenticate.
- `gcloud config set account service-account-name@gcp-project.iam.gserviceaccount.com` set the service account as the active account (`similar to --activate`)

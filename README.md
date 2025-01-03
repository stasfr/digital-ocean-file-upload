# Info

## Pref.

This project is an example of saving files to a DigitalOcean Space (Bucket) using a Node.js backend.
You can also use the FileStorageAdapter in any backend, such as Next.js or Nuxt.js.

# How to Setup

## Project init

### Install Dependencies

```bash
$ pnpm i
```

### Start the Development Server

```bash
$ pnpm run dev
```

### Build for Production

```bash
$ pnpm run build
```

## Environment Variables

1. Go to your space at `https://cloud.digitalocean.com/spaces`
2. Copy the Origin Endpoint and remove the Space name from it. For example: `https://<DELETE_THIS_PART>.<HERE_IS_REGION>.digitaloceanspaces.com`
3. Go to Settings, select "Access Key", and click "Create Access Key". You need at least Read/Write/Delete (Objects) permissions
4. Select your bucket and give a name for new Key
5. After creating the Key, you will see Secret Access Key

> Important!
> The Secret Access Key will only be shown once!

6. Copy the Secret Access Key and the Access Key ID, and paste them into the `.env` file
7. The bucket name is the same as your Space name

# Code Documentation

## File Storage Adapter Constructor

In the `defaultFilePath`, you can specify the folder within your Bucket where files will be saved

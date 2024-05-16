import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { deskStructure } from './schemaTypes/deskStructure'


export default defineConfig({
  name: 'default',
  title: 'backend',

  projectId: '7wz6aui0',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

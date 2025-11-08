# Managing Design Changes

## Quick Reference

### Before Making Changes
If you want to try a design change but might want to revert:

1. **Create a git commit** (recommended):
   ```bash
   git add .
   git commit -m "Snapshot before design changes"
   ```

2. **Or ask me to create a backup** - I can copy key files before changes

### Reverting Changes

**Using Git** (if you committed):
```bash
# See what changed
git status
git diff

# Revert to last commit
git checkout -- .

# Or revert specific files
git checkout -- src/components/Transcript.tsx
```

**Without Git**:
- Ask me to restore from the DESIGN_SNAPSHOT.md
- I can read the current files and restore previous versions

## Best Practice Workflow

1. **Make a commit before major changes**
2. **Try your changes**
3. **If you like them**: Make another commit
4. **If you don't like them**: Revert with `git checkout -- .`

## What I Remember

- ✅ I can see current file contents when I read them
- ✅ I can create backups before changes
- ✅ I can restore from backups or git history
- ❌ I don't remember previous conversations automatically
- ❌ I don't have persistent memory between sessions

## Tips

- **Use git commits** for version control (best practice)
- **Ask me to create backups** before experimental changes
- **Reference DESIGN_SNAPSHOT.md** for current design details
- **Tell me what you want to change** and I'll help implement it


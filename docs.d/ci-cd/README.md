# CI/CD Documentation

This directory contains the consolidated CI/CD documentation for the GotMusic pipeline. All CI/CD information is now consolidated into two comprehensive files.

## 📚 **Documentation Overview**

### **Primary Documentation**
- **[CI-CD-GUIDE.md](CI-CD-GUIDE.md)** 🔴 CRITICAL - Complete CI/CD guide with architecture, setup, troubleshooting, and operations

### **Related Documentation**
- **[../scripts/README.md](../scripts/README.md)** - Local CI scripts and usage
- **[../STUDIO-CONSOLE-REFACTOR.md](../STUDIO-CONSOLE-REFACTOR.md)** - Studio/Console refactoring guide
- **[../testing/e2e.md](../testing/e2e.md)** - E2E testing documentation

## 🚀 **Quick Start**

### **For Developers**
1. **Start here**: [CI-CD-GUIDE.md](CI-CD-GUIDE.md) - Complete setup and operations guide
2. **Local CI**: [../scripts/README.md](../scripts/README.md) - Run CI locally
3. **Troubleshooting**: [CI-CD-GUIDE.md](CI-CD-GUIDE.md#troubleshooting) - Fix common issues

### **For DevOps/Platform**
1. **Architecture**: [CI-CD-GUIDE.md](CI-CD-GUIDE.md#architecture) - Complete pipeline overview
2. **Requirements**: [CI-CD-GUIDE.md](CI-CD-GUIDE.md#requirements) - Infrastructure needs
3. **Operations**: [CI-CD-GUIDE.md](CI-CD-GUIDE.md#operations) - Monitoring and maintenance

## 🔧 **Local Development**

### **Preflight (2-minute validation)**
```bash
./scripts/preflight.sh
```
- ✅ **Fastest validation** (2-3 minutes)
- ✅ Database setup and seeding
- ✅ Server health and readiness checks
- ✅ Middleware smoke tests
- ✅ One @public Playwright test
- ✅ Catches 80-90% of issues before CI

### **SSR Smoke Test (1-second validation)**
```bash
cd apps/web && yarn playwright test -g "@public home SSR smoke"
```
- ✅ **Ultra-fast SSR check** (1-2 seconds)
- ✅ Validates homepage renders correctly
- ✅ Catches SSR issues before CI
- ✅ Perfect for quick iteration

### **Targeted Testing**
```bash
# Start server once
cd apps/web && yarn dev -p 4123

# Run specific test tags
./scripts/pw-fast.sh "@public"           # Homepage/catalog tests
./scripts/pw-fast.sh "@studio|@auth"     # Studio/auth tests  
./scripts/pw-fast.sh "@console"          # Console tests
```

### **Quick CI (No Database)**
```bash
./scripts/quick-ci.sh
```

### **Full CI with Docker**
```bash
./scripts/local-ci-docker.sh
```

### **Full CI (Manual PostgreSQL)**
```bash
./scripts/local-ci.sh
```

## 📊 **Pipeline Status**

| Component | Status | Last Updated |
|-----------|--------|--------------|
| GitHub Actions | ✅ Operational | October 2025 |
| Local CI Scripts | ✅ Operational | October 2025 |
| E2E Tests | ✅ Operational | October 2025 |
| Security Scanning | ✅ Operational | October 2025 |

## 🎯 **Key Features**

- **Multi-platform CI**: Web, mobile, and desktop applications
- **Comprehensive Testing**: Unit, integration, E2E, and visual regression tests
- **Security Scanning**: CodeQL, dependency scanning, secret detection
- **Performance Monitoring**: Bundle size, build time, test performance
- **Local Development**: Full CI simulation with Docker support
- **Emergency Procedures**: Rollback, recovery, and troubleshooting guides

## 📞 **Support**

### **Common Issues**
- **Build Failures**: See [CI-CD-GUIDE.md](CI-CD-GUIDE.md#build-failures)
- **Test Failures**: See [CI-CD-GUIDE.md](CI-CD-GUIDE.md#test-failures)
- **Routing Issues**: See [CI-CD-GUIDE.md](CI-CD-GUIDE.md#routing-issues)
- **Security Issues**: See [CI-CD-GUIDE.md](CI-CD-GUIDE.md#security-issues)

### **Emergency Contacts**
- **Level 1**: Check logs and common fixes
- **Level 2**: Try systematic fixes  
- **Level 3**: Use emergency procedures
- **Level 4**: Contact development team

---

*Last updated: October 2025*  
*Status: ✅ Production Ready*  
*Organization: ✅ Properly Structured*
